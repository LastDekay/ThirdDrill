import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import reportWebVitals from './reportWebVitals';

const CHARACTER = gql`
	query getCharacters {
		character {
			id
			name
		}
	}
`;

function Characters({ charaSelected }) {
	const { loading, error, data } = useQuery(CHARACTER);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<div>
			{data.character.map((cha) => {
				return <h2 key={cha.id}>{cha.name}</h2>;
			})}
		</div>
	);
}

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'https://thirddrill.hasura.app/v1/graphql',
	}),
});

const App = () => (
	<ApolloProvider client={client}>
		<h1>Third Drill</h1>
		<Characters />
	</ApolloProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
//reportWebVitals(console.log);
