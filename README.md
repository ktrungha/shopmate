The project uses Redux, Redux thunk and Material UI.

Code is divided into module in the modules folder.
Some data is put into the redux store while much is kept on the components' state.

Data fetching is done with redux thunk as this is much more fitting than redux saga.
Failing fetch always prompts user for retry.
Invalid access token while fetch will log user out automatically.
makeCancelOldThunks function helps cancelling pending thunk in the same way redux sage's takeLatest cancels pending sagas.

Responsive design is done with main page component and separate layout components for different screen sizes (desktop and tablet).
Component responsiveness is done with support of media query from material UI's withStyles.
