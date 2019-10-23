import React from 'react';
import List from './List.jsx';

class App extends React.Component {
    render() {
        return(
            <div>
                <List>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </List>
            </div>
        );
    }
}

export default App;
