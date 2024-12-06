import { SideMenuList } from "./SideMenuList";
import { LibraryList } from "./LibraryList";

export function SideBar() {

    return(

        <>
            <nav className="flex flex-col gap-2">
                <div className="bg-zinc-900 rounded-lg p-2">
                    <SideMenuList />
                </div>
            </nav>

            <nav className="bg-zinc-900 rounded-lg p-2 flex-1 ">
                <LibraryList />
            </nav>
        </>
    )
}
