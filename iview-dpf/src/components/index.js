import bmsaDropGrid from './bmsa-drop-grid';
import bmsaOrgTree from './bmsa-org-tree';
import bmsaShearImage from './bmsa-shear-image';
import bmsaTableTool from './bmsa-table-tool';
import bmsaTableAction from './bmsa-table-action';
import bmsaDivide from './bmsa-divide';
import bmsaBill from './bmsa-bill';
import bmsaModalSelect from './bmsa-modal-select';
import bmsaInputPart from './bmsa-input-part';

import bingoForm from './bingo-form';
import bingoFormItem from './bingo-form-item';
import bingoGridItem from './bingo-grid-item';
import bingoShrinkCard from './bingo-shrink-card';
import bingoToolbar from './bingo-toolbar';
import bingoQuery from './bingo-query';
import bingoModal from './bingo-modal';
import bingoModalEdit from './bingo-modal-edit';
import bingoHeadPhoto from './bingo-head-photo';
import bingoSuperFlow from './bingo-super-flow';
import bingoSelectIcon from './bingo-select-icon';
import bingoTree from './bingo-tree';
import bingoSelect from './bingo-select';
import bingoCreateInfo from './bingo-create-info';
import bingoState from './bingo-state';
import bingoMessage from './bingo-message';
import bingoAlert from './bingo-alert';
import bingoPart from './bingo-part';
import bingoQuill from './bingo-quill';
import bingoDateWeek from './bingo-date-week/index.vue';
import bingoCalendar from './bingo-calendar';
import bingoCalendarJane from './bingo-calendar-jane';
import bingoDragList from './bingo-drag-list';

const components = {
    bmsaDropGrid,
    bmsaOrgTree,
    bmsaShearImage,
    bmsaTableTool,
    bmsaTableAction,
    bmsaDivide,
    bmsaBill,
    bmsaModalSelect,
    bmsaInputPart,

    bingoForm,
    bingoFormItem,
    bingoGridItem,
    bingoShrinkCard,
    bingoToolbar,
    bingoQuery,
    bingoModal,
    bingoModalEdit,
    bingoHeadPhoto,
    bingoSuperFlow,
    bingoSelectIcon,
    bingoTree,
    bingoSelect,
    bingoCreateInfo,
    bingoState,
    bingoMessage,
    bingoAlert,
    bingoPart,
    bingoQuill,
    bingoDateWeek,
    bingoCalendar,
    bingoCalendarJane,
    bingoDragList,
}
const install = Vue => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
    Vue.prototype.$BAlert = bingoAlert;
    Vue.prototype.$BMessage = bingoMessage;
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install;
