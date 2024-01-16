import crossIcon from 'assets/icons/cross.svg';
import closeIcon from "assets/icons/cross-black.svg"
import editIcon from "assets/icons/pencil.svg"
import editPencilIcon from "assets/icons/pencil-white.svg"
import plusIcon from "assets/icons/plus-square.svg"
import logoIcon from "assets/images/Header_bosch.svg"
import searchIcon2 from "assets/icons/search2.svg"
import spinnerIcon from "assets/icons/tube-spinner.svg"
import plusIcon2 from "assets/icons/add-2.svg"
import listIcon from "assets/icons/drag&drop.svg"
import crossIcon2 from "assets/icons/cross-white.svg"
import settingIcon from "assets/icons/controal-4.svg"
import vectorIcon from "assets/icons/vector.svg"
import arrowTLIcon from "assets/icons/arrowTL.svg"
import arrowTCIcon from "assets/icons/arrowTC.svg"
import arrowTRIcon from "assets/icons/arrowTR.svg"
import arrowCLIcon from "assets/icons/arrowCL.svg"
import arrowCCIcon from "assets/icons/arrowCC.svg"
import arrowCRIcon from "assets/icons/arrowCR.svg"
import arrowBLIcon from "assets/icons/arrowBL.svg"
import arrowBCIcon from "assets/icons/arrowBC.svg"
import arrowBRIcon from "assets/icons/arrowBR.svg"
import arrowTLActiveIcon from "assets/icons/arrowTL-active.svg"
import arrowTCActiveIcon from "assets/icons/arrowTC-active.svg"
import arrowTRActiveIcon from "assets/icons/arrowTR-active.svg"
import arrowCLActiveIcon from "assets/icons/arrowCL-active.svg"
import arrowCCActiveIcon from "assets/icons/arrowCC-active.svg"
import arrowCRActiveIcon from "assets/icons/arrowCR-active.svg"
import arrowBLActiveIcon from "assets/icons/arrowBL-active.svg"
import arrowBCActiveIcon from "assets/icons/arrowBC-active.svg"
import arrowBRActiveIcon from "assets/icons/arrowBR-active.svg"
import copyIcon from "assets/icons/copy.svg"
export const CrossIcon = crossIcon
export const CloseIcon = closeIcon
export const EditIcon = editIcon
export const PlusIcon = plusIcon
export const LogoIcon = logoIcon
export const SearchIcon2 = searchIcon2
export const SpinnerIcon = spinnerIcon
export const PencelWhiteIcon = editPencilIcon
export const PlusIcon2 = plusIcon2
export const ListIcon = listIcon
export const CrossIcon2 = crossIcon2
export const SettingIcon = settingIcon
export const VectorIcon = vectorIcon
export const ArrowTLIcon = arrowTLIcon
export const ArrowTCIcon = arrowTCIcon
export const ArrowTRIcon = arrowTRIcon
export const ArrowCLIcon = arrowCLIcon
export const ArrowCCIcon = arrowCCIcon
export const ArrowCRIcon = arrowCRIcon
export const ArrowBLIcon = arrowBLIcon
export const ArrowBCIcon = arrowBCIcon
export const ArrowBRIcon = arrowBRIcon
export const ArrowTLActiveIcon = arrowTLActiveIcon
export const ArrowTCActiveIcon = arrowTCActiveIcon
export const ArrowTRActiveIcon = arrowTRActiveIcon
export const ArrowCLActiveIcon = arrowCLActiveIcon
export const ArrowCCActiveIcon = arrowCCActiveIcon
export const ArrowCRActiveIcon = arrowCRActiveIcon
export const ArrowBLActiveIcon = arrowBLActiveIcon
export const ArrowBCActiveIcon = arrowBCActiveIcon
export const ArrowBRActiveIcon = arrowBRActiveIcon
export const CopyIcon = copyIcon
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