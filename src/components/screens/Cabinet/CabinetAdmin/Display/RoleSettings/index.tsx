import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { UserRole } from "../../UsersRole/UserRole";


export const RoleUsersDisplay = () => {
    const users = useSelector((state: RootState) => state.admin.users)
    // const usersRole = users.map((el) => <UserRole key={el.id} setUserOpenOK={setUserOpen} idUserOpen={idUserOpen} id={el.id} />)
    return (
        <div>

        </div>
    )
}