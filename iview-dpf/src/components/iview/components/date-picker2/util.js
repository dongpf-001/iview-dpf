import dateUtil from '../../utils/date';

//获取大众周 add by dongpf
export const getWeek = function(value){
    let dateStr = value.substring(0, 10) // 如果传入的参数是含有时分秒的字符串（如"2017-09-20 17:39:00"）截取日期
    let allDate = new Date(dateStr);
    let lastM = allDate.getMonth(); // 月
    let lastD = allDate.getDate(); // 当前日
    let lastDD = allDate.getDay(); //当前星期
    let y = allDate.getFullYear(); // 完整年份
    let yWeek; // 当前周
    let yDate = new Date(allDate.getFullYear(), allDate.getMonth(), allDate.getDate());
    // 获取实际一年中的第一天是几号
    let firstDate = getFirstDate(allDate.getFullYear(), allDate.getMonth(), allDate.getDate());
    let firstM = firstDate.getMonth();
    let firstD = firstDate.getDate();
    let firstDD = firstDate.getDay();
    let thisDays = (yDate - firstDate) / 86400000 + 1;
    if (firstM == 0 && firstD == 1) {
        if (firstDD == 0) {
            yWeek = getISOWeekAll(firstDate.getFullYear() - 1);
            y = y - 1;//年需要减去1  added by lvdk 20120723
        } else if (firstDD == 1) {
            yWeek = 1;
        }
    } else {
        if (thisDays > 0) {
            if (lastM == 11 && lastD == 31) {
                if (lastDD == 0) {
                    yWeek = getISOWeekAll(firstDate.getFullYear());
                } else if (lastDD == 1) {
                    yWeek = 1;
                    y=y+1;
                } else {
                    yWeek = Math.ceil(thisDays / 7);
                }
            } else {
                yWeek = Math.ceil(thisDays / 7);
                let c = thisDays % 7;
                if (c == 0) {
                    yWeek = yWeek;
                } else {
                    if (lastDD == 0) {
                        yWeek = yWeek - 1;
                    }
                }
            }
        } else {
            yWeek = getISOWeekAll(firstDate.getFullYear() - 1);
            y = y - 1;
        }
    }
    return yWeek; // 返回正确的大众周
}

export const getFirstDate = function(y, m, d) {
    //1月1号
    let firDate;
    let firstdate = new Date(y, 0, 1);
    //计算年头
    let firstDay = firstdate.getDay();
    if (firstDay == 0) firstDay = +7;
    if (firstDay > 4) {
        if (firstDay == 7 && m == 0 && d == 1) {
            firDate = new Date(y, 0, 1);
        } else {
            d = 1 + (8 - firstDay);
            firDate = new Date(y, 0, d);
        }
    } else {
        if (firstDay == 1 && m == 0 && d == 1) {
            firDate = new Date(y, 0, 1);
        } else {
            d = 31 - (firstDay - 1);
            firDate = new Date((y - 1), 11, d);
        }
    }
    return firDate;
}
//按照一汽大众的业务逻辑计算每年的实际总周数
export const getISOWeekAll = function() {
    //1月1号
    let firstDate = new Date(y, 0, 1);
    //12月31号
    let lastDate = new Date(y, 11, 31);
    //计算一年的总天数
    let countDay = (lastDate - firstDate) / 86400000 + 1;
    //计算年头
    let firstDay = firstDate.getDay();
    if (firstDay == 0) firstDay = +7;
    if (firstDay > 4) {
        countDay = countDay - (8 - firstDay);
    } else {
        countDay = (countDay - 1) + firstDay;
    }
    //计算年尾
    let lastDay = lastDate.getDay();
    if (lastDay == 0) lastDay = +7;
    if (lastDay > 3) {
        countDay = countDay + (7 - lastDay);
    } else {
        countDay = countDay - lastDay;
    }
    let yWeekCount = countDay / 7;
    return yWeekCount;
}

export const toDate = function(date) {
    let _date = new Date(date);
    // IE patch start (#1422)
    if (isNaN(_date.getTime()) && typeof date === 'string'){
        _date = date.split('-').map(Number);
        _date[1] += 1;
        _date = new Date(..._date);
    }
    // IE patch end

    if (isNaN(_date.getTime())) return null;
    return _date;
};

export const clearHours = function (time) {
    const cloneDate = new Date(time);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};

export const isInRange = (time, a, b) => {
    if (!a || !b) return false;
    const [start, end] = [a, b].sort();
    return time >= start && time <= end;
};

export const formatDate = function(date, format) {
    date = toDate(date);
    if (!date) return '';
    return dateUtil.format(date, format || 'yyyy-MM-dd');
};

export const parseDate = function(string, format) {
    return dateUtil.parse(string, format || 'yyyy-MM-dd');
};

export const getDayCountOfMonth = function(year, month) {
    return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = function(date) {
    const temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
};

export const siblingMonth = function(src, diff) {
    const temp = new Date(src); // lets copy it so we don't change the original
    const newMonth = temp.getMonth() + diff;
    const newMonthDayCount = getDayCountOfMonth(temp.getFullYear(), newMonth);
    if (newMonthDayCount < temp.getDate()) {
        temp.setDate(newMonthDayCount);
    }
    temp.setMonth(newMonth);

    return temp;
};

export const prevMonth = function(src) {
    return siblingMonth(src, -1);
};

export const nextMonth = function(src) {
    return siblingMonth(src, 1);
};

export const initTimeDate = function() {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
};

export const formatDateLabels = (function() {
    /*
      Formats:
      yyyy - 4 digit year
      m - month, numeric, 1 - 12
      mm - month, numeric, 01 - 12
      mmm - month, 3 letters, as in `toLocaleDateString`
      Mmm - month, 3 letters, capitalize the return from `toLocaleDateString`
      mmmm - month, full name, as in `toLocaleDateString`
      Mmmm - month, full name, capitalize the return from `toLocaleDateString`
    */

    const formats = {
        yyyy: date => date.getFullYear(),
        m: date => date.getMonth() + 1,
        mm: date => ('0' + (date.getMonth() + 1)).slice(-2),
        mmm: (date, locale) => {
            const monthName = date.toLocaleDateString(locale, {
                month: 'long'
            });
            return monthName.slice(0, 3);
        },
        Mmm: (date, locale) => {
            const monthName = date.toLocaleDateString(locale, {
                month: 'long'
            });
            return (monthName[0].toUpperCase() + monthName.slice(1).toLowerCase()).slice(0, 3);
        },
        mmmm: (date, locale) =>
            date.toLocaleDateString(locale, {
                month: 'long'
            }),
        Mmmm: (date, locale) => {
            const monthName = date.toLocaleDateString(locale, {
                month: 'long'
            });
            return monthName[0].toUpperCase() + monthName.slice(1).toLowerCase();
        }
    };
    const formatRegex = new RegExp(['yyyy', 'Mmmm', 'mmmm', 'Mmm', 'mmm', 'mm', 'm'].join('|'), 'g');

    return function(locale, format, date) {
        const componetsRegex = /(\[[^\]]+\])([^\[\]]+)(\[[^\]]+\])/;
        const components = format.match(componetsRegex).slice(1);
        const separator = components[1];
        const labels = [components[0], components[2]].map(component => {
            const label = component.replace(/\[[^\]]+\]/, str => {
                return str.slice(1, -1).replace(formatRegex, match => formats[match](date, locale));
            });
            return {
                label: label,
                type: component.indexOf('yy') != -1 ? 'year' : 'month'
            };
        });
        return {
            separator: separator,
            labels: labels
        };
    };
})();

// Parsers and Formaters
export const DEFAULT_FORMATS = {
    date: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    year: 'yyyy',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    time: 'HH:mm:ss',
    timerange: 'HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    datetimerange: 'yyyy-MM-dd HH:mm:ss'
};

// export const RANGE_SEPARATOR = ' - ';  // use picker.vue prop separator

const DATE_FORMATTER = function(value, format) {
    return formatDate(value, format);
};
const DATE_PARSER = function(text, format) {
    return parseDate(text, format);
};
const RANGE_FORMATTER = function(value, format, RANGE_SEPARATOR) {
    if (Array.isArray(value) && value.length === 2) {
        const start = value[0];
        const end = value[1];

        if (start && end) {
            return formatDate(start, format) + RANGE_SEPARATOR + formatDate(end, format);
        }
    } else if (!Array.isArray(value) && value instanceof Date){
        return formatDate(value, format);
    }
    return '';
};
const RANGE_PARSER = function(text, format, RANGE_SEPARATOR) {
    const array = Array.isArray(text) ? text : text.split(RANGE_SEPARATOR);
    if (array.length === 2) {
        const range1 = array[0];
        const range2 = array[1];

        return [
            range1 instanceof Date ? range1 : parseDate(range1, format),
            range2 instanceof Date ? range2 : parseDate(range2, format),
        ];
    }
    return [];
};

export const TYPE_VALUE_RESOLVER_MAP = {
    default: {
        formatter(value) {
            if (!value) return '';
            return '' + value;
        },
        parser(text) {
            if (text === undefined || text === '') return null;
            return text;
        }
    },
    date: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    datetime: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    daterange: {
        formatter: RANGE_FORMATTER,
        parser: RANGE_PARSER
    },
    datetimerange: {
        formatter: RANGE_FORMATTER,
        parser: RANGE_PARSER
    },
    timerange: {
        formatter: RANGE_FORMATTER,
        parser: RANGE_PARSER
    },
    time: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    month: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    year: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    multiple: {
        formatter: (value, format) => {
            return value.filter(Boolean).map(date => formatDate(date, format)).join(',');
        },
        parser: (value, format) => {
            const values = typeof value === 'string' ? value.split(',') : value;
            return values.map(value => {
                if (value instanceof Date) return value;
                if (typeof value === 'string') value = value.trim();
                else if (typeof value !== 'number' && !value) value = '';
                return parseDate(value, format);
            });
        }
    },
    number: {
        formatter(value) {
            if (!value) return '';
            return '' + value;
        },
        parser(text) {
            let result = Number(text);

            if (!isNaN(text)) {
                return result;
            } else {
                return null;
            }
        }
    }
};

