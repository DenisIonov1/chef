import chefLogo from "../assets/chefIcon.svg"

export default function() {
    return (
        <header className="header">
            <div className="header__wrapper">
                <img src={chefLogo} alt="" className="header__logo" />
                <p className="header__text">Chef Claude</p>
            </div>
        </header>
    )
}