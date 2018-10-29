var state = {
    header: {
        filters: {
            select: true,
            insert: true,
            update: true,
            delete: true
        },
        webSocket: {
            url: 'wss://192.168.33.21:8080/'
        },
    },
    content: {
        queries: [

        ],
        query: null,
        maxQueries: 3000
    }
}

export default state