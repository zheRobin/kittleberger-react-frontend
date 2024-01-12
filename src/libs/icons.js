import crossIcon from 'assets/icons/cross.svg';
import closeIcon from "assets/icons/cross-black.svg"
import editIcon from "assets/icons/pencil.svg"
import editPencilIcon from "assets/icons/pencil-white.svg"
import plusIcon from "assets/icons/plus-square.svg"
import logoIcon from "assets/images/Header_bosch.svg"
import searchIcon2 from "assets/icons/search2.svg"
import spinnerIcon from "assets/icons/tube-spinner.svg"
import plusIcon2 from "assets/icons/add-2.svg"
export const CrossIcon = crossIcon
export const CloseIcon = closeIcon
export const EditIcon = editIcon
export const PlusIcon = plusIcon
export const LogoIcon = logoIcon
export const SearchIcon2 = searchIcon2
export const SpinnerIcon = spinnerIcon
export const PencelWhiteIcon = editPencilIcon
export const PlusIcon2 = plusIcon2
export const Loading = () => {
    return (
        <div className="cover-spin" style={{ margin: "0px 0px 0px 0px" }}>
            <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" overflow="visible" fill="#8F7300" stroke="none">
                <defs>
                    <circle id="loader" r="4" cx="50" cy="50" transform="translate(0 -30)" />
                </defs>
                <g className="loader" transform="rotate(51 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(103 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(154 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(206 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(257 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(309 50 50)"><use xlinkHref="#loader" /></g>
                <g className="loader" transform="rotate(360 50 50)"><use xlinkHref="#loader" /></g>
            </svg>
        </div>
    )
}