export default {
  async  registerCoach(context, data) {
        const userId = context.rootGetters.useId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            areas: data.areas,
            description: data.desc,
            hourlyRate: data.rate
        };
    const response =  await  fetch(`https://coach-finder-3b3d0-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
    
            method: 'PUT',
            body: JSON.stringify(coachData)
    });

        if (!response.ok) {
            // error ...
        }
        context.commit('registerCoach', {
            ...coachData,
            id: userId
        })
        
    },

    async loadCoaches(context, payload) { 


        if (!payload.forceRefresh && !context.getters.shouldUpdate) { 
            return;
        }
const token = context.rootGetters.token

        const response = await fetch(`https://coach-finder-3b3d0-default-rtdb.europe-west1.firebasedatabase.app/coaches.json?auth=` + token);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }
        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }
}