import { request, selectors, setFilter } from 'ducks/perspective';
import { openModal as cognateAnalysisOpenModal } from 'ducks/cognateAnalysis';
import { openModal as phonemicAnalysisOpenModal } from 'ducks/phonemicAnalysis';
import { openModal as phonologyOpenModal } from 'ducks/phonology';
import enhance from 'pages/utils';
import { shallowEqual } from 'recompose';

import Component from './component';
import saga from '../../pages/Perspective/saga';
import getParams from './utils';

function init(props) {
  return request(getParams(props));
}

function submitFilter(value) {
  return setFilter(value);
}

function openCognateAnalysisModal(perspectiveId, mode = '') {
  return cognateAnalysisOpenModal(perspectiveId, mode);
}

function openPhonemicAnalysisModal(perspectiveId) {
  return phonemicAnalysisOpenModal(perspectiveId);
}

function openPhonologyModal(perspectiveId) {
  return phonologyOpenModal(perspectiveId);
}

export default enhance({
  props(state) {
    return {
      perspective: selectors.getPerspective(state),
    };
  },
  actions: {
    submitFilter,
    openCognateAnalysisModal,
    openPhonemicAnalysisModal,
    openPhonologyModal,
  },
  updateWhen({ perspective: np }, { perspective: op }) {
    return !shallowEqual(np, op);
  },
  init,
  saga,
})(Component);
