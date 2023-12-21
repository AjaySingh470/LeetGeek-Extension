
export async function getData(){
    
    const URL = "api/vr/problems-of-day/problem/today/";
    const response = await fetch(URL,{
        method : 'GET',
        headers: {
            'Access-Control-Allow-Origin': true,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582',
            
            },
    });
    const data = await response.json();
    console.log(data);
}
