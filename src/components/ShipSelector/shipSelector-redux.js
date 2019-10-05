import ACTIONS from "./shipSelector-actions";

export const mapStateToProps = state => {
    console.log('mapStateToProps', state)
    const {shipSelector} = state
    return ({
    ...shipSelector
  })
};
  
export const mapDispatchToProps = dispatch => ({
    onMounted: _ => dispatch(ACTIONS.onMounted()),
    fetchShips: _ => dispatch(ACTIONS.fetchShips()),
    requestShips: _ => dispatch(ACTIONS.requestShips()),
    recivedShips: ships => dispatch(ACTIONS.recivedShips(ships)),
});
  
  