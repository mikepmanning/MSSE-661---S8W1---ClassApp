const access_token = (typeof localStorage !== 'undefined' && localStorage.length > 0) ? localStorage.getItem('access_token') : '';
const token = `Bearer ${access_token}`;

const _get = async (url) => {
    console.log(token);
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: token,
            'Access-Control-Expose-Headers': 'Authorization',
            'Content-Type': 'application/json',
        },
    });
    
    if (!res.ok) {
        const errorData = await res.json(); 
        throw new Error(errorData.message || `HTTP Error: ${res.status}`); 
    }

    return res.json();
}

const _post = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const errorData = await res.json(); 
        throw new Error(errorData.message || `HTTP Error: ${res.status}`); 
    }

    return res;
}

const _put = async (url, data) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

