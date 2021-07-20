// const t = {};

// const uiState = {};

// const services = {
//   viewController: {
//     * fade(viewId) {
//       // TODO: abort on something
//       if ((yield * $select(fadingViews))[viewId]) return;
//       yield put(actions.viewController.fade({ viewId: ViewId.MainMenuView, duration: 500, }));
//       yield delay(600);
//       yield put(actions.mainMenuView.close());
//     },
//     * open(viewId) {
//       yield put(actions.viewController.open({ viewId: ViewId.MainMenuView, }));
//     }
//   }
// }

// function * watcher() {
//   takeAll(handleExecuteProgram, function * (action) {
//     const { payload } = action;
//     const { programId } = action;
//     const openFrom = (yield * $select(mainMenuPrograms))[programId].rect;
//     yield put(actions.programView.setProgram({ programId, openFrom, }));
//     yield put(actions.programView.setState({ state: 'uninitialised', }));
//     yield call(services.viewController.fade, ViewId.MainMenuView);
//     yield call(services.viewController.open, ViewId.ProgramView);
//     // yield put(actions.viewController.open({ viewId: ViewId.MainMenuView, }));
//     yield put(actions.programView.setState({ state: 'loading', }));
//     yield put(actions.programView.setPercentage({ percentage: 20 }));
//     yield put(actions.programView.setPercentage({ percentage: 40 }));
//     yield put(actions.programView.setPercentage({ percentage: 80 }));
//     yield put(actions.programView.setPercentage({ percentage: 100 }));
//     yield put(actions.programView.setState({ state: 'running', }));
//   });
// }

// function * service(rect) {
//   yield put(switchView({ startingRect: rect }));
//   yield put(startExpanding());
// }
