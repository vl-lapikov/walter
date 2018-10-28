class Query {

    static normalize(query) {
        let strQuery = query.words.join( ' ' );
        query.original = strQuery;
        query.filtered = strQuery.replace( /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '' ).trim();
        query.words = query.filtered.split( ' ' );

        query.tables = [];
        var isNext = false;
        query.words.forEach( function ( word ) {
            if (isNext) {

                // Subquery starts?
                if (word[0] === '(') {
                    isNext = false;
                    return;
                }
                // Remove quotes `
                word = word.replace( /`/g, '' );
                // Remove ending bracket ")"
                word = word.replace( /\)/g, '');

                query.tables.push( word );
                isNext = false;
            }
            if (['from', 'into', 'update', 'delete', 'join'].includes( word )) {
                isNext = true;
            }
        } );

        query.queryType = query.words[0];
        return query
    }
}

export default Query