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

export const getTeams = async () => {
    let teams = localStorage.getItem('teams')
    if (!teams) {
        try {
            const response = await fetch(`https://www.balldontlie.io/api/v1/teams`);
            if (!response.ok) {
                throw new Error(`Uh oh...Something went wrong!`);
            }
            const { data } = await response.json();
            const teamData = data.map((team) => ({
                // class: team.name,
                teamId: team.id,
                name: team.full_name,
                conference: team.conference,
                division: team.division,
                city: team.city,
                abbreviation: team.abbreviation,
            }));
            teams = teamData
            localStorage.setItem('teams', JSON.stringify(teams))
        } catch (err) {
            console.error(err);
        }
    }
    else {
        teams = JSON.parse(teams)
    }
    return teams
}; 
