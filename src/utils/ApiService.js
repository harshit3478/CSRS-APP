// src/utils/ApiService.js
class ApiService {
    // Function to initiate an emergency
    async initiateEmergency(email, latitude = '12', longitude = '20', landmark = 'landmark') {
      try {
        const body = JSON.stringify({ email, latitude, longitude, landmark });
        const response = await fetch(process.env.API_URL + '/emergency/v1/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });
  
        const result = await response.json();
        if (response.ok) {
          return { success: true, data: result };
        } else {
          return { success: false, message: result.message };
        }
      } catch (error) {
        return { success: false, message: error.message };
      }
    }
  }
  
  export default new ApiService();
  