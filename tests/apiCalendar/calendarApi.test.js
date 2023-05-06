import calendarApi from "../../src/apiCalendar/calendarApi"

describe('Pruebas en calendarApi', () => {
    
    test('Debe de tener la conficuracion por defecto', () => {

        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL )

    })

    test('Debe de tener el x-token en el Header de todas las peticiones', async() => {

        const token = 'ABC-123-XYZ'
        localStorage.setItem('calendarapp-token', token)


        const res = await calendarApi.get('/auth')
        

        expect( res.config.headers['x-token'] ).toBe(token)

    })

})