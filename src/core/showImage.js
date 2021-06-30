import { API } from '../config';
import React , {useEffect, useState} from 'react';
import '../styles.css';

export const ShowImage = ({url, myStyling}) => {

    return(
            <img src={url} alt="" className={myStyling} style={{maxHeight: '100%', maxWidth: '100%'}}/>  
    );
};
