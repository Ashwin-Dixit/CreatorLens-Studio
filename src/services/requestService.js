export async function submitRequest({name, email, brand, service, budget, projectDetails}){
    try{
            const res = await fetch("/api/sendEmail", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, brand, service, budget, projectDetails})
        })
        const resObject = await res.json();
        if(!res.ok){
            throw new Error(resObject.message)
        }
        return resObject
    } catch(error){
        console.log(error)
        throw error;
    }

}

export async function submitQuestion({email, question}){
    try{
        const res = await fetch("/api/sendEmail", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({type: "question", email, question})
        })
        const resObject = await res.json();
        if(!res.ok){
            throw new Error(resObject.message)
        }
        return resObject
    } catch(error){
        console.log(error)
        throw error;
    }
}