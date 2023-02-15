// const url = 'http://localhost:3000/'
const url = 'https://ubclick.onrender.com/'

async function apiClient(route, method, body){
    try {
      if(body){
       
        const response = await fetch(`${url}${route}`, {
          method: method,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
        return response
      }else{
        const response = await fetch(`${url}${route}`, {
          method: method,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
        return response
      }
       
    }catch(err){
        return err
    }
}

export { apiClient };
