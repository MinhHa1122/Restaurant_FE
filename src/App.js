import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/Routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component;
            return <Route key={index} path={route.path} element={
              Page !== null ? (
                <Layout Children={<Page />}>
                </Layout>
              ) : (
                <Layout />
              )
            }
            />
          })}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
