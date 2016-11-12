/**
 * Created by Megabyte on 11.11.2016.
 */
module.exports = {
    Top:0,
    Middle:1,
    Bottom:2,
    validate:function(v){
        if(typeof (v)!=='number') throw 'number expected';
        if(v < 0 || v > 2) throw 'enum value Lane-Type out of range';
    }
}