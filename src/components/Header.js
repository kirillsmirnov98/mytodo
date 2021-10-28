import './Header.style.css';

const Header = () => {
    const heading = <h1>MY TODO</h1>;
    return(
       <div className="Header">
            {heading}
       </div>
    );
}

export default Header;