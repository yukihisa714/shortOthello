L = [];
for (i = 8; i--;) L[i] = Array(8).fill(0);
L[3][4] = L[4][3] = 1;
L[3][3] = L[4][4] = 2;

t = t => console.log(t)

t(L);

pl1 = 1;
pl2 = 2;

s = z => {
    a = pl1;
    pl1 = pl2;
    pl2 = a
}

o = z => t("置けません");

c = (x, y) => {
    p = 0;
    mL = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    if (!L[y][x]) {
        for (j = 9; j--;) {
            px = j % 3 - 1;
            py = (j / 3 | 0) - 1;
            ax = x + px;
            ay = y + py;
            while (L[ay] && L[ay][ax] == pl2) {
                ax += px;
                ay += py;
                if (L[ay] && L[ay][ax] == pl1) mL[py + 1][px + 1] = p = 1
            }
        }
    }
    mL[3] = p;
    return mL
}

put = (x, y) => {
    if (L[y][x]) o();
    else {
        p = c(x, y);
        // 置けることが確認できたとき
        if (p[3]) {
            for (j = 9; j--;) {
                if (p[py = j / 3 | 0][px = j % 3]) {
                    f = 1;
                    L[y][x] = pl1;
                    // y + (py - 1) * f  =>  y + py * f - f
                    while (L[ay = y + py * f - f][ax = x + px * f - f] == pl2) L[ay][ax] = pl1, f++
                }
            }
            d = [0, 0, 0];
            // 0,1,2を数える
            for (i = 64; i--;) d[L[i / 8 | 0][i % 8]]++;
            t(d);
            // 0,1,2のいずれも0でないとき
            if (d[0] * d[1] * d[2]) {
                s();
                p = 0;
                for (a = 64; a--;) p += c(a % 8, a / 8 | 0)[3];
                if (!p) t("パス"), s();
                t(pl1 + "のターン")
            }
            else d[1] == d[2] ? t("ドロー") : t(d.indexOf(Math.max(d[1], d[2])) + "の勝ち")
        }
        else o()
    }
    t(L.join("\n"))
}