import React from "react";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { auth } from "../../firebase/firebase.utils";
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from "../../redux/cart/cart.selector";

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv} from './header.styles';
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to = '/'>
            <Logo className = 'logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to = '/shop'>SHOP</OptionLink>
            <OptionLink to = '/contact'>CONTACT</OptionLink>
            {
                currentUser ?
                <OptionDiv onClick = {() => auth.signOut()}>SIGN-OUT</OptionDiv> :
                <OptionLink to = '/signin'>SIGN-IN</OptionLink>
            }
            <CartIcon />
            {
                hidden ? null:
                <CartDropdown />
            }
        </OptionsContainer>
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);