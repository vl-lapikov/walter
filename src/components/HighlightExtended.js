import React from 'react';
import Highlight from 'react-highlight'

class HighlightExtended extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.query !== nextProps.query;
    }

    render() {
        const {query} = this.props;

        return <Highlight className="sql">{query}</Highlight>;
    }
}

export default HighlightExtended
