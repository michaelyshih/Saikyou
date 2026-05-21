import Viewer from '../scene/Viewer3D';
import DataTable from '../data/dataTable';

export function initScene() {
    const viewer = new Viewer();
    const datatable = new DataTable();
    datatable.addPanelsData("m");
    datatable.addPanelsData("a");
    datatable.addPanelsData("s");
    viewer.populate();
    return { viewer, datatable };
}
