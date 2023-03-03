export class BlindDateStateManager {
  changeState(newState) {
    switch (newState.state) {
      case 'WAITING_TO_START':
        // todo add notify api
        break;
      case 'WAITING_STARTED':
        // join api
        break;
      case 'MATCH_WAITING_TO_JOIN':
        // join api
        break;
      default:
      // code block
    }
  }
}
