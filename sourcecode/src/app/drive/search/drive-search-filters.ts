import {
    DatatableFilter,
    FilterControlType,
    FilterOperator,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/datatable-filter';
import {
    CreatedAtFilter,
    UpdatedAtFilter,
} from '@common/datatable/datatable-filters/search-input-with-filters/filter-config/timestamp-filter';
import {FILE_ENTRY_TYPE_FILTER} from '../../../common/admin/file-entry-index/file-entry-index-filters';
import {CurrentUser} from '../../../common/auth/current-user';

export function driveSearchFilters(currentUSer: CurrentUser): DatatableFilter[] {
    return [
        FILE_ENTRY_TYPE_FILTER,
        new DatatableFilter({
            type: FilterControlType.Select,
            key: 'owner_id',
            label: 'Owner',
            description: 'User that this file was uploaded by',
            defaultValue: currentUSer.get('id'),
            options: [
                {key: 'Anyone', value: {value: null, operator: '!='}},
                {key: 'Owned by me', value: currentUSer.get('id')},
                {
                    key: 'Not owned by me',
                    value: {value: currentUSer.get('id'), operator: '!='},
                },
            ],
        }),
        new CreatedAtFilter({
            description: 'Date file was uploaded',
        }),
        new UpdatedAtFilter({
            description: 'Date file was last changed',
        }),
        new DatatableFilter({
            type: FilterControlType.StaticValue,
            key: 'deleted_at',
            label: 'Trashed',
            defaultOperator: FilterOperator.ne,
            defaultValue: null,
            description: 'Only show files that are in the trash',
        }),
        new DatatableFilter({
            type: FilterControlType.StaticValue,
            key: 'shareableLink',
            label: 'Has Shareable Link',
            description: 'Only show files that have a shareable link',
            defaultValue: '*',
            defaultOperator: FilterOperator.has,
        }),
        new DatatableFilter({
            type: FilterControlType.StaticValue,
            key: 'sharedByMe',
            label: 'Shared By Me',
            defaultValue: true,
            description:
                'Only show files that are shared with someone',
        }),
    ];
}
