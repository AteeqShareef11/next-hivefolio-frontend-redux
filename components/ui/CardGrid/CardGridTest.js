import react, { useEffect } from "react"

import CardUserTest from '../Card/CardUserTest';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../../redux/actions/userActions";

const CardGridTest = ({titleText, style1, children}) => {

const users = useSelector((state) => state);

const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  console.log("users card test", users)

    return (
        <div className="">

            <h2 className="">{titleText}</h2>
                <ul>
                    <li className={style1}>{children}</li>
                    {/* <li className={style1}><CardUserTest /></li> */}
                </ul>
        </div>
    )
}

export default CardGridTest