const TASKS_API = `${BASE_API_URL}/tasks`;

const getTasks = () => {
   const response = _get(TASKS_API)
   .catch(function(error) { 
    console.error("Failed getting tasks", error);
    return null;
});

    return response;
}