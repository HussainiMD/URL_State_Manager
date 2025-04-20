

export async function getUserPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts', {
            method: 'get'            
        });

        if(response.ok && response.status !== 404) {
            return await response.json();
        } else {
            console.log('posts api response', response);
            const errObj = new Error('Unable to fetch posts');
            errObj.status  = response.status;
            errObj.statusText = response.statusText;
            throw errObj;
        }

    }catch(err) {
        console.warn(err);
        throw err;
    }
}


export async function getTags() {
    try {
        const response = await fetch('http://localhost:3000/tags', {
            method: 'get',
            headers: {
                "Content-Type": "application/json"                
            }
        });

        if(response.ok && response.status !== 404) {
            return await response.json();
        } else {
            console.log('tags api response', response);
            const errObj = new Error('Unable to fetch tags');
            errObj.status  = response.status;
            errObj.statusText = response.statusText;
            throw errObj;
        }

    }catch(err) {
        console.warn(err);
        throw err;
    }
}