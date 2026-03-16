const userState = {};

function getUserState(from) {

  if (!userState[from]) {
    userState[from] = {
      step: 0,
      tentativasInvalidas: 0
    };
  }

  return userState[from];
}

function resetUserState(from) {
  delete userState[from];
}

module.exports = {
  userState,
  getUserState,
  resetUserState
};