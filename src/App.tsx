import RepoList from "./components/RepoList";
import "./styles.css";

export default function App({ client }: any) {
  return (
    <div className="App">
      <RepoList client={client} />
    </div>
  );
}
