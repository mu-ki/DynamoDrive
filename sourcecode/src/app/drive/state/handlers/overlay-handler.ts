import {Actions, ofActionSuccessful, Store} from '@ngxs/store';
import {OpenFilePreview} from '../actions/commands';
import {OverlayPanel} from '@common/core/ui/overlay-panel/overlay-panel.service';
import {FilePreviewOverlayComponent} from '../../preview/file-preview-overlay/file-preview-overlay.component';
import {DriveState} from '../drive-state';
import {Injectable} from '@angular/core';
import {OverlayPanelRef} from '../../../../common/core/ui/overlay-panel/overlay-panel-ref';

@Injectable()
export class OverlayHandler {
    private overlayRef: OverlayPanelRef<FilePreviewOverlayComponent>;
    constructor(
        private store: Store,
        private actions$: Actions,
        private overlay: OverlayPanel
    ) {
        this.actions$
            .pipe(ofActionSuccessful(OpenFilePreview))
            .subscribe((action: OpenFilePreview) => {
                if (this.overlayRef) {
                    this.overlayRef.close();
                    this.overlayRef = null;
                }
                const entries = this.store
                    .selectSnapshot(DriveState.entries)
                    .filter(e => e.type !== 'folder');
                const selectedEntry = this.store.selectSnapshot(DriveState.selectedEntry);
                const activeEntry = entries.findIndex(e => e.id === selectedEntry?.id);
                this.overlayRef = this.overlay.open(FilePreviewOverlayComponent, {
                    position: 'center',
                    origin: 'global',
                    panelClass: 'file-preview-overlay-container',
                    data: {
                        entries: entries.slice(),
                        activeEntry: activeEntry === -1 ? 0 : activeEntry,
                    },
                });
            });
    }
}
