export const getSavedTeamIds = () => {
    const savedTeamIds = localStorage.getItem('saved_teams')
        ? JSON.parse(localStorage.getItem('saved_teams'))
        : [];

    return savedTeamIds;
};

export const saveTeamIds = (teamIdArr) => {
    if (teamIdArr.length) {
        localStorage.setItem('saved_teams', JSON.stringify(teamIdArr));
    } else {
        localStorage.removeItem('saved_teams');
    }
};

export const removeTeamId = (teamId) => {
    const savedTeamIds = localStorage.getItem('saved_teams')
        ? JSON.parse(localStorage.getItem('saved_teams'))
        : null;

    if (!savedTeamIds) {
        return false;
    }

    const updatedSavedTeamIds = savedTeamIds?.filter((savedTeamId) => savedTeamId !== teamId);
    localStorage.setItem('saved_teams', JSON.stringify(updatedSavedTeamIds));

    return true;
};