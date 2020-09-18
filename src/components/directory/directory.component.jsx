import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import '../directory/directory.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

const Directory = ( {sections} ) => (
    <div className = 'directory-menu'>
    {
        sections.map(({title, imageUrl, id, size, linkUrl}) => (
            <MenuItem key = {id} title = {title} imageUrl = {imageUrl} size = {size} linkUrl = {linkUrl} />
        ))
    }
    </div>
);

const MapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})


export default connect(MapStateToProps)(Directory);