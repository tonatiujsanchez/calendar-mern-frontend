

export const getEnvVariables = () => {

    // import.meta.env
  
    return { 
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_MODE: import.meta.env.VITE_MODE 
    }
}


// export const getEnvVariables = () => {

//     import.meta.env
  
//     return { ...import.meta.env }
// }



// Testing

// export const getEnvVariables = () => {

//     if (typeof process !== "undefined") {
//         return { ...process.env }
//     } else {
//         return { ...import.meta.env }
//     }
// }
