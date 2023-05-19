L = [];
for (i = 8; i--;) L[i] = Array(8).fill(0);
L[3][4] = L[4][3] = 1;
L[3][3] = L[4][4] = 2;

console.log(L);

pl1 = 1;
pl2 = 2;

change = () => {
    a = pl1;
    pl1 = pl2;
    pl2 = a
}

check = (x, y) => {
    p = 0;
    mL = [];
    for (i = 3; i--;) mL[i] = Array(3).fill(0);
    if (L[y][x] == 0) {
        for (py = -1; py < 2; py++) {
            for (px = -1; px < 2; px++) {
                ax = px;
                ay = py;
                i = 0;
                while (L[y + ay] && L[y + ay][x + ax] == pl2) {
                    ax += px;
                    ay += py;
                    i++
                }
                if (i && L[y + ay][x + ax] == pl1) {
                    mL[py + 1][px + 1] = 1;
                    p = 1;
                }
            }
        }
    }
    return { p, mL };
}

checkAll = () => {
    for (a = 64; a--;) {
        if (check(a % 8, a / 8 | 0).p) return 1
    }
    return 0
}

put = (x, y) => {
    // console.log(pl1, pl2);
    if (L[y][x] == 0) {
        flg = 0;
        p = check(x, y);
        // console.log(p);
        for (py = -1; py < 2; py++) {
            for (px = -1; px < 2; px++) {
                if (p.mL[py + 1][px + 1]) {
                    i = 1;
                    while (L[y + py * i][x + px * i] == pl2) {
                        L[y + py * i][x + px * i] = pl1;
                        i++;
                    }
                    flg = 1;
                }
            }
        }
        d = [0, 0, 0];
        for (i = 64; i--;) d[L[i / 8 | 0][i % 8]]++;
        // console.log(d);
        e = 1;
        for (i of d) e *= i
        if (!e) {
            if (d[1] < d[2]) console.log(`${2}の勝ち`)
            else if (d[1] > d[2]) console.log(`${1}の勝ち`)
            else console.log("ドロー")
        }
        else {
            if (flg) {
                L[y][x] = pl1;
                change();
                if (!checkAll()) {
                    console.log("パス");
                    change();
                }
            }
            console.log(L);
            p = 1;
            for (i = 64; i--;) p *= L[i / 8 | 0][i % 8]
            if (p) console.log("終了");
            else console.log(`${pl1}のターン`);
        }
    }
    else console.log("置けません")
}