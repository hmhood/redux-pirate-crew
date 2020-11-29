const { createStore } = Redux;

const initialState = {
  crewMembers: [],
  walkedPlank: []
};

const crewMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CREW_MEMBER:
      const newCrewArray = state.crewMembers.concat(action.newCrewMember);
      return Object.assign({}, state, {
        crewMembers: newCrewArray,
      });
    case WALK_PLANK:
      const crewToWalkPlank = state.crewMembers.shift()
      const newCrewWalkedArray = state.walkedPlank.concat(crewToWalkPlank)
      return Object.assign({}, state, {
        walkedPlank: newCrewWalkedArray
      })
    default:
      return state;
  }
};

const newCrewForm = document.getElementById("new-pirate-form");

const ADD_CREW_MEMBER = "ADD_CREW_MEMBER";
const addCrewMember = (newCrewMember) => {
  return {
    type: ADD_CREW_MEMBER,
    newCrewMember: newCrewMember,
  };
};

newCrewForm.addEventListener("submit", () => {
  event.preventDefault();
  const crewName = document.getElementById("name").value;
  document.getElementById("name").value = "";
  const newCrewMember = { name: crewName };
  store.dispatch(addCrewMember(newCrewMember));
});

const walkPlankButton = document.getElementById('walk-the-plank')

const WALK_PLANK = 'WALK_PLANK'
const walkPlank = () => {
  return {
    type: WALK_PLANK
  }
}

walkPlankButton.addEventListener("click", () => {
  if (store.getState().crewMembers.length === 0) {
    alert('This crew has no pirates!')
  } else {
    store.dispatch(walkPlank())
  }
})

const store = createStore(crewMemberReducer);
const crewList = document.getElementById("current-crew");
const walkedPlankList = document.getElementById("walked-crew")
const numberWalked = document.getElementById("plank-walkers")

const render = () => {
  let newCrewList = "";
  store.getState().crewMembers.forEach((crewMember) => {
    newCrewList += `<li>${crewMember.name}</li>`;
  });
  crewList.innerHTML = newCrewList;

  let newWalkedPlankList = ""
  store.getState().walkedPlank.forEach((crewMember) => {
    newWalkedPlankList += `<li>${crewMember.name}</li>`
  })
  walkedPlankList.innerHTML = newWalkedPlankList

  let plankWalkers = store.getState().walkedPlank.length
  numberWalked.innerHTML = plankWalkers
};

render();
store.subscribe(render);