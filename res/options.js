import {
    ActChargeOnShopQuery,
    ActWriteOffQuery,
    ActWriteOffShopQuery,
    Direction,
    OrgInfoQuery,
    ProductInfoQuery,
    ProductRestQuery,
    TransferFromShopQuery,
    TransferToShopQuery,
    WaybillQuery,
    WaybillType
} from 'evotor-egais-api'

export const getDayAgoDate = () => {
    const current = new Date();
    current.setDate(current.getDate() - 1);
    return current;
};

const textFilter = (name, apply) => {
    return {
        type: 'text',
        name: name,
        apply: apply
    }
};

const dateFilter = (apply) => {
    return {
        type: 'date',
        apply: apply
    }
};

const options = [
    {
        name: "Документы ЕГАИС",
        next: [
            {
                name: "Приёмка",
                init: () => new WaybillQuery().direction.equal(Direction.OUT).and().date.greater(getDayAgoDate(), true),
                filters: [
                    dateFilter((values) => new WaybillQuery().direction.equal(Direction.OUT).and().date.greater(values[0], true).and().date.lower(values[1]))
                ]
            }, {
                name: "Списание",
                next: [
                    {
                        name: "Из магазина",
                        init: () => new ActWriteOffShopQuery().actDate.greater(getDayAgoDate(), true),
                        filters: [
                            dateFilter((values) => new ActWriteOffShopQuery().actDate.greater(values[0], true).and().actDate.lower(values[1]))
                        ]
                    }, {
                        name: "Со склада",
                        init: () => new ActWriteOffQuery().actDate.greater(getDayAgoDate(), true),
                        filters: [
                            dateFilter((values) => new ActWriteOffQuery().actDate.greater(values[0], true).and().actDate.lower(values[1]))
                        ]
                    }
                ]
            }, {
                name: "Возврат",
                init: () => new WaybillQuery().direction.equal(Direction.IN).and().type.equal(WaybillType.RETURN_FROM_ME).and().date.greater(getDayAgoDate(), true),
                filters: [
                    dateFilter((values) => new WaybillQuery().direction.equal(Direction.IN).and().type.equal(WaybillType.RETURN_FROM_ME).and().date.greater(values[0], true).and().date.lower(values[1]))
                ]
            }, {
                name: "Перемещение",
                next: [
                    {
                        name: "На склад",
                        init: () => new TransferFromShopQuery().transferDate.greater(getDayAgoDate(), true),
                        filters: [
                            dateFilter((values) => new TransferFromShopQuery().transferDate.greater(values[0], true).and().transferDate.lower(values[1]))
                        ]
                    }, {
                        name: "В магазин",
                        init: () => new TransferToShopQuery().transferDate.greater(getDayAgoDate(), true),
                        filters: [
                            dateFilter((values) => new TransferToShopQuery().transferDate.greater(values[0], true).and().transferDate.lower(values[1]))
                        ]
                    }, {
                        name: "В другой магазин",
                        init: () => new WaybillQuery().direction.equal(Direction.IN).and().type.equal(WaybillType.INVOICE_FROM_ME).and().date.greater(getDayAgoDate(), true),
                        filters: [
                            dateFilter((values) => new WaybillQuery().direction.equal(Direction.IN).and().type.equal(WaybillType.INVOICE_FROM_ME).and().date.greater(values[0], true).and().date.lower(values[1]))
                        ]
                    }
                ]
            }, {
                name: "Постановка на баланс",
                init: () => new ActChargeOnShopQuery().actDate.greater(getDayAgoDate(), true),
                filters: [
                    dateFilter((values) => new ActChargeOnShopQuery().actDate.greater(values[0], true).and().actDate.lower(values[1]))
                ]
            }
        ]
    }, {
        name: "Справочники ЕГАИС",
        next: [
            {
                name: "Список контрагентов",
                init: () => new OrgInfoQuery().noFilters(),
                filters: [
                    textFilter("Отбор по ИНН", (value) => new OrgInfoQuery().inn.like("%" + value + "%")),
                    textFilter("Отбор по названию", (value) => new OrgInfoQuery().fullName.like("%" + value + "%").or().shortName.like("%" + value + "%"))
                ]
            }, {
                name: "Список продуктов",
                init: () => new ProductInfoQuery().noFilters(),
                filters: [
                    textFilter("Отбор по названию", (value) => new ProductInfoQuery().fullName.like("%" + value + "%").or().shortName.like("%" + value + "%"))
                ]
            }, {
                name: "Товарные остатки",
                init: () => new ProductRestQuery().noFilters(),
                filters: [
                    textFilter("Отбор по названию", (value) => new ProductRestQuery().productInfo.fullName.like("%" + value + "%").or().productInfo.shortName.like("%" + value + "%")),
                ]
            }
        ]
    }
];

export default options;