const { createStore } = Redux;

const initialState = {
  crewMembers: [],
};

//Reducer
const crewMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CREW_MEMBER:
      const newCrewArray = state.crewMembers.concat(action.newCrewMember);
      return Object.assign({}, state, {
        crewMembers: newCrewArray,
      });
    default:
      return state;
  }
};

const newCrewForm = document.getElementById("new-pirate-form");

const ADD_CREW_MEMBER = "ADD_CREW_MEMBER";

//Action creator
const addCrewMember = (newCrewMember) => {
  return {
    type: ADD_CREW_MEMBER,
    newCrewMember: newCrewMember,
  };
};

//Event listener
newCrewForm.addEventListener("submit", () => {
  event.preventDefault();
  const crewName = document.getElementById("name").value;
  document.getElementById("name").value = "";
  const newCrewMember = { name: crewName };
  store.dispatch(addCrewMember(newCrewMember));
});

//Setup store
const store = createStore(crewMemberReducer);

//Renders list of crew members to page
const crewList = document.getElementById("current-crew");

const render = () => {
  let newCrewList = "";
  store.getState().crewMembers.forEach((crewMember) => {
    newCrewList += `<li>${crewMember.name}</li>`;
  });
  crewList.innerHTML = newCrewList;
};

render();
store.subscribe(render);