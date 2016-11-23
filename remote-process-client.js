/**
 * Created by Megabyte on 09.11.2016.
 */
const Game = require('./model/game.js');
const Wizard = require('./model/wizard.js');
const Message = require('./model/message.js');
const Status = require('./model/status.js');
const World = require('./model/world.js');
const Player = require('./model/player.js');
const PlayerContext = require('./model/player-context.js');
const Minion = require('./model/minion.js');
const Projectile = require('./model/projectile.js');
const Bonus = require('./model/bonus.js');
const Building = require('./model/building.js');
const Tree = require('./model/tree.js');
const SkillType = require('./model/skill-type.js');


module.exports.connect = function connect(host, port, onConnect) {

    const net = require('net');

    var request = [];
    var answer = [];
    var busy;
    var remainder;
    var client = net.connect(port, host, function connectHandler() {
        // 'connect' listener
        console.log('connected to server!');
        onConnect();
    });
    client.setNoDelay();

    function dataHandler(data) {
        if (data) {
            if (remainder) {
                data = Buffer.concat([remainder, data]);
            }
        } else {
            if (remainder) {
                data = remainder;
            } else {
                return;
            }
        }
        busy = true;
        var len = data.length;
        var pos = 0;
        var tooSmall = false;
        var v;
        while (!tooSmall && (request.length > 0)) {
            //network problems imitation
            /*
             if (len>0 && Math.random()>0.995) {
             setTimeout(dataHandler, 100);
             break;
             }//*/
            if (typeof (pos) === 'undefined') throw 'error';
            var need = request[0];
            if (typeof (need) === 'function') {
                //end of request;
                need(answer);
                answer = [];
            } else if (typeof (need) === 'number') {
                //read buffer with certain length
                if (len >= need) {
                    answer.push(data.slice(pos, pos + need));
                    pos += need;
                    len -= need;
                }
            } else switch (need) {
                case 'enum':
                    if (len > 1) {
                        v = data.readInt8(pos);
                        answer.push((v < 0) ? null : v);
                        pos += 1;
                        len -= 1;
                    } else {
                        tooSmall = true;
                    }
                    break;
                case 'bool':
                    if (len > 1) {
                        var bl = data.readInt8(pos);
                        if (bl !== 0 && bl !== 1) throw 'wrong bool value reade';
                        answer.push(bl !== 0);
                        pos += 1;
                        len -= 1;
                    } else {
                        tooSmall = true;
                    }
                    break;
                case 'long':
                    if (len >= 8) {
                        answer.push(data.readUInt32LE(pos));
                        pos += 8;
                        len -= 8;
                    } else {
                        tooSmall = true;
                    }
                    break;
                case 'int':
                    if (len >= 4) {
                        answer.push(data.readInt32LE(pos));
                        pos += 4;
                        len -= 4;
                    } else {
                        tooSmall = true;
                    }
                    break;
                case 'double':
                    if (len >= 8) {
                        answer.push(data.readDoubleLE(pos));
                        pos += 8;
                        len -= 8;
                    } else {
                        tooSmall = true;
                    }
                    break;
                default :
                    throw 'Wrong type';
                    break
            }
            if (!tooSmall) {
                request.shift();
            }
        }
        if (len > 0) {
            if (pos > 0) {
                remainder = data.slice(pos);
            } else {
                remainder = data;
            }
        } else {
            remainder = null;
        }
        busy = false;
    }
    client.on('data', dataHandler);
    client.on('error', function onError(e) {
        console.log("SOCKET ERROR: " + e.message);
        process.exit(1);
    });

    client.on('close', function onClose() {
        console.log('server closed connection.');
        process.exit(1);
    });
    client.on('end', function onEnd() {
        console.log('disconnected from server');
        process.exit();
    });
    var readSequence = function readSequence(a, callback) {
        if (!callback) {
            throw 'Callback expected';
        }
        if (Array.isArray(a)) {
            if (a.length < 1) {
                throw 'empty sequence to read';
            }
            request = request.concat(a);
        } else {
            request.push(a);
        }
        request.push(callback);
        if (!busy) {
            dataHandler();
        }
        /* //callers tracing. Weapon against callbacks-hell
         var a = [];
         var c = arguments.callee;
         while(c){
         if(!c.name) throw 'unknown function';
         a.push(c);
         c = c.caller;
         }
         callback.callStackDebug = a;*/
    };

    function readEnum(callback) {
        readSequence('enum', function onEnumReaded(a) {
            callback(a[0]);
        });
    }
    function readBool(callback) {
        readSequence('bool', function onBoolReaded(a) {
            callback(a[0]);
        });
    }
    function readInt(callback) {
        readSequence('int', function onIntReaded(a) {
            callback(a[0]);
        });
    }
    function readLong(callback) {
        readSequence('long', function onLongReaded(a) {
            callback(a[0]);
        });
    }
    function readDouble(callback) {
        readSequence('double', function omDoubleReaded(a) {
            callback(a[0]);
        });
    }
    function readFixedByteArray(len, callback) {
        readSequence(len, function onFixedByteArrayReaded(a) {
            callback(a[0]);
        });
    }
    function readByteArray(nullable, callback) {

        readInt(function readByteArrayf1(len) {


            if (len < 0) {
                callback(null);
            } else if (len === 0) {
                if (nullable) {
                    callback(null);
                } else {
                    callback([]);
                }
            } else {
                readFixedByteArray(len, function readByteArrayf2(resArray) {
                    var buf = resArray[0];
                    var ab = new ArrayBuffer(buf.length);
                    var view = new Uint8Array(ab);
                    for (var i = 0; i < buf.length; ++i) {
                        view[i] = buf[i];
                    }
                    callback(ab);
                });
            }
        });
    }
    function readEnums(enumType, callback) {
        readArrayOfElements(readEnum, function onEnumsReaded(a) {
            a.some(enumType.validate);
            callback(a);
        });
    }
    function readNullableEnums(callback) {
        readByteArray(true, callback);
    }
    function readInts(callback) {
        readArrayOfElements(readInt, callback);
    }
    function readNulableEnums2D(callback) {
        readArrayOfElements(readNullableEnums, callback);
    }
    function readString(callback) {
        readInt(function readStringf1(len) {
            if (len < 0) {
                callback(null);
            } else if (len === 0) {
                callback('');
            } else {
                readFixedByteArray(len, function readStringf2(resArray) {
                    callback(resArray.toString('utf8'));
                });
            }
        });
    }
    function writeString(s) {
        var b = Buffer.from(s, 'utf-8');
        writeInt(b.length);
        client.write(b);
    }
    function writeInt(val) {
        tmpBuf.writeInt32LE(val, 0);
        var b = tmpBuf.slice(0, 4);
        client.write(b);
    }
    function writeDouble(val) {
        tmpBuf.writeDoubleLE(val, 0);
        var b = tmpBuf.slice(0, 8);
        client.write(b);
    }
    function writeLong(val) {
        tmpBuf.writeInt32LE(val, 0);
        tmpBuf.writeInt32LE((val === -1) ? -1 : 0, 4);
        var b = tmpBuf.slice(0, 8);
        client.write(b);
    }
    var tmpBuf = Buffer.alloc(1000);
    function writeEnum(val) {
        if (!val) val = 0;
        tmpBuf.writeInt8(val, 0);
        var b = tmpBuf.slice(0, 1);
        client.write(b);
    }
    function writeMessages(messages) {
        if (!messages) {
            writeInt(-1);
            return;
        }
        writeInt(messages.length);
        messages.some(writeMessage);
    }
    function writeMessage(message) {
        writeBoolean(message);
        writeEnum(message.lane);
        writeEnum(message.skillToLearn);
        writeByteArray(message.rawMessage);
    }
    function writeByteArray(array) {
        if (!array) {
            writeInt(-1);
        } else {
            writeInt(array.Length);
            var b = Buffer.from(a);
            client.write(b);
        }
    }
    function writeBoolean(v) {
        writeEnum(v ? 1 : 0);
    }
    this.writeTokenMessage = function writeTokenMessage(token) {
        writeEnum(MessageType.AuthenticationToken);
        writeString(token);
    };
    this.writeProtocolVersionMessage = function writeProtocolVersionMessage() {
        writeEnum(MessageType.ProtocolVersion);
        writeInt(2);
    };
    this.readTeamSizeMessage = function readTeamSizeMessage(callback) {
        readEnum(function readTeamSizeMessagef1(val) {
            ensureMessageType(val, MessageType.TeamSize);
            readInt(callback);
        })
    };
    this.readGameContextMessage = function readGameContextMessage(callback) {
        readEnum(function readGameContextMessagef1(val) {
            ensureMessageType(val, MessageType.GameContext);
            readGame(callback);
        });
    };
    function readGame(callback) {
        readBool(function readGamef1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence([
                    'long', 'int', 'double', 'bool', 'bool', 'double', 'double',
                    'double', 'double', 'double', 'double', 'double', 'double', 'int',
                    'double', 'int', 'double', 'double', 'double', 'double', 'double',
                    'double', 'double', 'int', 'int', 'int', 'int', 'double', 'double',
                    'double', 'double', 'double', 'int', 'int', 'int', 'int', 'int',
                    'int', 'int', 'int', 'int', 'int', 'int', 'int', 'int', 'int',
                    'int', 'double', 'double'], function readGamef2(firstPart) {
                    readInts(function readGamef3(ints) {
                        readSequence([
                            'double', 'double', 'double',
                            'double', 'int', 'int', 'int', 'int', 'double', 'double', 'int',
                            'double', 'double', 'double', 'int', 'int', 'double', 'double',
                            'int', 'double', 'double', 'int', 'double', 'double', 'int',
                            'double', 'double', 'double', 'double', 'int', 'int', 'double',
                            'double', 'double', 'double', 'int', 'int', 'double', 'double',
                            'double', 'double', 'int', 'int', 'int', 'int', 'int', 'double',
                            'int', 'int', 'double', 'double', 'double', 'int', 'double',
                            'double', 'double', 'double', 'int', 'int', 'double', 'int'
                        ], function readGamef4(secondPart) {
                            firstPart.push(ints);
                            var data = firstPart.concat(secondPart);
                            var game = Game.getInstance.apply(undefined, data);
                            callback(game);
                        })
                    })

                })
            }

        })
    }
    this.readPlayerContextMessage = function readPlayerContextMessage(callback) {

        readEnum(function readPlayerContextMessagef1(messageType) {
            if (messageType === MessageType.GameOver) {
                process.exit(0);
            } else {
                ensureMessageType(messageType, MessageType.PlayerContext);
                readPlayerContext(callback);
            }
        });
    };
    function readPlayerContext(callback) {
        readBool(function readPlayerContextf1(val) {
            if (!val) {
                callback(null);
            } else {
                readWizards(function readPlayerContextf2(wizards) {
                    readWorld(function readPlayerContextf3(world) {
                        var playerContext = PlayerContext.getInstance(wizards, world);
                        callback(playerContext);
                    })
                })
            }
        })
    }
    function readArrayOfElements(reader, callback) {
        var arrayTargetLen;
        var arrayBuilder;
        var __ArrayReaderHandler = function __ArrayReaderHandler(data) {
            arrayBuilder.push(data);
            arrayTargetLen--;
            if (arrayTargetLen === 0) {
                callback(arrayBuilder);
            } else {
                reader(__ArrayReaderHandler);
            }
        };
        readInt(function onReadArrayLen(len) {
            if (len < 0) {
                callback(null);
                return;
            }
            arrayBuilder = [];
            if (len === 0) {
                callback(arrayBuilder);
            } else {
                arrayTargetLen = len;
                reader(__ArrayReaderHandler);
            }
        });
    }
    function readWizards(callback) {
        readArrayOfElements(readWizard, callback);
    }
    function readMessage(callback) {
        readBool(function readMessagef1(val) {
            if (!val) {
                callback(null);
            } else {
                readEnum(function readMessagef2(v1) {
                    readEnum(function readMessagef3(v2) {
                        readByteArray(false, function f4(bytes) {
                            var message = Message.getInstance( v1, v2, bytes);
                            callback(message);
                        })
                    })
                })
            }
        });
    }
    function readMessages(callback) {
        readArrayOfElements(readMessage, callback);
    }
    function readWizard(callback) {
        readBool(function readWizardf1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence([
                    'long', 'double', 'double', 'double', 'double', 'double',
                    'enum', 'double', 'int', 'int'
                ], function f2(part1) {
                    readStatuses(function readWizardf2_1(statuses) {
                        part1.push(statuses);
                        readSequence([
                            'long', 'bool',
                            'int', 'int', 'double', 'double', 'int', 'int'
                        ], function readWizardf3(part2) {
                            readEnums(SkillType, function readWizardw3(skills) {
                                part2.push(skills);
                                readInt(function readWizardf4(int1) {
                                    part2.push(int1);
                                    readInts(function readWizardf5(ints1) {
                                        part2.push(ints1);
                                        readBool(function readWizardf6(bool1) {
                                            part2.push(bool1);
                                            readMessages(function readWizardf7(messages) {
                                                part2.push(messages);
                                                var data = part1.concat(part2);
                                                var wizard = Wizard.getInstance.apply(undefined, data);
                                                callback(wizard);
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }
        })
    }
    function readStatus(callback) {
        readBool(function readStatusf1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence(['long', 'enum', 'long', 'long', 'int'], function readStatusf2(data) {
                    var status = Status.getInstance.apply(undefined, data);
                    callback(status);
                })
            }
        });
    }
    function readStatuses(callback) {
        readArrayOfElements(readStatus, callback);
    }
    function readWorld(callback) {
        readBool(function readWorldf1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence([
                    'int', 'int', 'double', 'double'
                ], function readWorldf2(part1) {
                    readArrayOfElements(readPlayer, function readWorldonPlayerReaded(players) {
                        readWizards(function readWorldonWizards(wizards) {
                            readArrayOfElements(readMinion, function readWorldOnMinions(minions) {
                                readArrayOfElements(readProjectile, function readWorldonProjectiles(projectiles) {
                                    readArrayOfElements(readBonus, function readWorldonBonuses(bonuses) {
                                        readArrayOfElements(readBuilding, function readWorldonBuildings(buildings) {
                                            readArrayOfElements(readTree, function readWorldonTrees(trees) {
                                                if (trees === null) {
                                                    trees = prevTrees;
                                                } else {
                                                    prevTrees = trees;
                                                }
                                                if (players === null) {
                                                    players = prevPlayers;
                                                } else {
                                                    prevPlayers = players;
                                                }
                                                if (buildings === null) {
                                                    buildings = prevBuildings;
                                                } else {
                                                    prevBuildings = buildings;
                                                }
                                                var world = World.getInstance(part1[0], part1[1], part1[2], part1[3], players, wizards, minions, projectiles, bonuses, buildings, trees);
                                                callback(world);
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }
        })
    }
    function readPlayer(callback) {
        readBool(function readPlayerf1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence(['long', 'bool'], function readPlayerf2(part1) {
                    readString(function readPlayerf3(s) {
                        part1.push(s);
                        readSequence(['bool', 'int', 'enum'], function readPlayerf4(part2) {
                            var player = Player.getInstance.apply(undefined, part1.concat(part2));
                            callback(player);
                        })
                    })
                })
            }
        })
    }
    function readMinion(callback) {
        readBool(function readMinionf1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence([
                    'long', 'double', 'double', 'double', 'double', 'double',
                    'enum', 'double', 'int', 'int'
                ], function readMinionf2(part1) {
                    readStatuses(function readMinionf3(statuses) {
                        part1.push(statuses);
                        readSequence(['enum', 'double', 'int', 'int', 'int'], function f4(part2) {
                            var minion = Minion.getInstance.apply(undefined, part1.concat(part2));
                            callback(minion);
                        })
                    })
                })
            }
        })
    }
    function readProjectile(callback) {
        readBool(function readProjectilef1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence([
                    'long', 'double', 'double', 'double', 'double', 'double',
                    'enum', 'double', 'enum', 'long', 'long'
                ], function readProjectilef2(data) {
                    var projectile = Projectile.getInstance.apply(undefined, data);
                    callback(projectile);
                })
            }
        })
    }
    function readBonus(callback) {
        readBool(function readBonusf1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence([
                    'long', 'double', 'double', 'double', 'double', 'double',
                    'enum', 'double', 'enum'
                ], function readBonusf2(data) {
                    var bonus = Bonus.getInstance.apply(undefined, data);
                    callback(bonus);
                })
            }
        })
    }
    function readBuilding(callback) {
        readBool(function readBuildingf1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence([
                    'long', 'double', 'double', 'double', 'double', 'double',
                    'enum', 'double', 'int', 'int'
                ], function readBuildingf2(part1) {
                    readStatuses(function readBuildingf3(statuses) {
                        part1.push(statuses);
                        readSequence(['enum',
                            'double', 'double', 'int', 'int', 'int'
                        ], function readBuildingf4(part2) {
                            var building = Building.getInstance.apply(undefined, part1.concat(part2));
                            callback(building);
                        })
                    })
                })
            }
        })
    }
    var prevTrees;
    var prevPlayers;
    var prevBuildings;

    function readTree(callback) {
        readBool(function readTreef1(val) {
            if (!val) {
                callback(null);
            } else {
                readSequence([
                    'long', 'double', 'double', 'double', 'double', 'double',
                    'enum', 'double', 'int', 'int'
                ], function readTreef2(part1) {
                    readStatuses(function readTreef3(statuses) {
                        part1.push(statuses);
                        var tree = Tree.getInstance.apply(undefined, part1);
                        callback(tree);
                    })
                })
            }
        })
    }
    function writeMove(move) {
        if (!move) {
            writeBoolean(false);
            return;
        }
        writeBoolean(true);
        writeDouble(move.getSpeed());
        writeDouble(move.getStrafeSpeed());
        writeDouble(move.getTurn());
        writeEnum(move.getAction());
        writeDouble(move.getCastAngle());
        writeDouble(move.getMinCastDistance());
        writeDouble(move.getMaxCastDistance());
        writeLong(move.getStatusTargetId());
        writeEnum(move.getSkillToLearn());
        writeMessages(move.getMessages());
    }
    this.writeMovesMessage = function writeMovesMessage(moves) {
        writeEnum(MessageType.Moves);
        writeInt(moves.length);
        moves.some(writeMove);
    }
	
	this.close = function close() {
		try {
			client.close();
		} catch (e) {
			console.log(e);
		}
	}

};

function ensureMessageType(actualType, expectedType) {
    if (actualType != expectedType) {
        throw "Received wrong message [actual=" + actualType + ", expected=" + expectedType + "].";
    }
}
var MessageType = {
    Unknown: 0,
    GameOver: 1,
    AuthenticationToken: 2,
    TeamSize: 3,
    ProtocolVersion: 4,
    GameContext: 5,
    PlayerContext: 6,
    Moves: 7
};