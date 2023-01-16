import createUserData from "../../testing/data/createUserData";
import { renderWithStore} from "../../testing/testRenderers";
import {UserDataResponseBody} from "../../types/types";
import createUserDataFromServer from "../../testing/data/createUserDataFromServer";
import React from "react";
import UserDataDisplayPage from "./UserDataDisplayPage";
import {act, screen} from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";
import {State} from "../../state";
import * as useUserDataRequest from "./hooks/useUserDataRequest";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ userId: '1' })
}));

describe('<UserDataDisplayPage/>', () => {
  const renderComponent = (userMap: State['userMap'] = {}) => renderWithStore(
    <MemoryRouter>
      <UserDataDisplayPage/>
    </MemoryRouter>,
    {
      preloadedState: {
        userMap
      }
    });

  beforeEach(  () => {
    // Mock out a responseBody
    const responseBody: UserDataResponseBody = {
      data: createUserDataFromServer({ id: 1 }),
      support: { url: '', text: ''}
    }

    const response = {
      json: () => Promise.resolve(responseBody),
      ok: true
    } as Response;

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response))
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('makes a fetch request and displays user data and back button on OK response', async () => {
    // We need to have an act block here to handle asynchronous setLoading state changes in the useUserDataRequest hook
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent();
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/users/1');

    expect(screen.getByText('User data for user with id: 1')).toBeInTheDocument();
    expect(screen.getByText('First name: Tad')).toBeInTheDocument();
    expect(screen.getByText('Last name: Mahlunge')).toBeInTheDocument();
    expect(screen.getByText('Avatar Link: http://hire-tad.com/images/good-developer.png')).toBeInTheDocument();
    expect(screen.getByText('Email: tadiwamahlunge@gmail.com')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'loading-spinner'})).not.toBeInTheDocument();
  });

  it('makes a fetch request and error page and back button on non-OK response', async () => {
    const errorResponse = {
      statusText: 'User not found',
      status: 404,
      ok: false
    } as Response;

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(errorResponse))

    // We need to have an act block here to handle asynchronous setLoading state changes in the useUserDataRequest hook
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent();
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/users/1');

    expect(screen.getByText('Error getting data for user with id: 1')).toBeInTheDocument();
    expect(screen.getByText('Status: 404')).toBeInTheDocument();
    expect(screen.getByText('Status text: User not found')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'loading-spinner'})).not.toBeInTheDocument();
  });

  it('does not call get request when data is already cached', async () => {
    const cachedUserMap = {
      1: createUserData({ id: 1,
        firstName: 'Ted',
        lastName: 'Smith',
        email: 'tedsmith@gmail.com'
      })
    }

    // We need to have an act block here to handle asynchronous setLoading state changes in the useUserDataRequest hook
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent(cachedUserMap);
    });

    expect(global.fetch).not.toHaveBeenCalled();

    expect(screen.getByText('User data for user with id: 1')).toBeInTheDocument();
    expect(screen.getByText('First name: Ted')).toBeInTheDocument();
    expect(screen.getByText('Last name: Smith')).toBeInTheDocument();
    expect(screen.getByText('Avatar Link: http://hire-tad.com/images/good-developer.png')).toBeInTheDocument();
    expect(screen.getByText('Email: tedsmith@gmail.com')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'loading-spinner'})).not.toBeInTheDocument();
  });

  it('will log an error when an unexpected error is thrown during GET request and display only a back button', async () => {
    const error = new Error('Error');
    const consoleLogError = jest.fn();

    jest.spyOn(console, 'error').mockImplementation(consoleLogError);
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      throw error;
    });

    // We need to have an act block here to handle asynchronous setLoading state changes in the useUserDataRequest hook
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderComponent();
    });

    expect(consoleLogError).toHaveBeenCalledWith('Caught unexpected error during GET request to http://localhost:8000/api/users/1', error);
    expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'loading-spinner'})).not.toBeInTheDocument();
    expect(screen.queryByText('User data for user with id: 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Error getting data for user with id: 1')).not.toBeInTheDocument();
  });

  it('displays loading spinner when loading is true', () => {
    jest.spyOn(useUserDataRequest, 'default').mockImplementation(() => ({ errorResponse: undefined, loading: true }))

    renderComponent();
    expect(screen.getByRole('img', { name: 'loading-spinner'})).toBeInTheDocument();
  });
});