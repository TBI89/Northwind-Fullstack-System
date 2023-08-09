
import './Page404.css';
import errImg from "../../../assets/images/page-not-found.webp";

function Page404(): JSX.Element {
  return (
    <div className="Page404">
      <h2>The page you are looking for doesn't exist</h2>
      <img src={errImg}/>
    </div>
  );
}

export default Page404;
