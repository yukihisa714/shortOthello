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

check = (x, y) => {
    p = 0;
    mL = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    if (!L[y][x]) {
        for (j = 9; j--;) {
            px = j % 3 - 1;
            py = (j / 3 | 0) - 1;
            ax = x + px;
            ay = y + py;
            i = 0;
            while (L[ay] && L[ay][ax] == pl2) {
                ax += px;
                ay += py;
                i = 1
            }
            if (i && L[ay] && L[ay][ax] == pl1) {
                mL[py + 1][px + 1] = 1;
                p = 1
            }
        }
    }
    return { p, mL }
}

put = (x, y) => {
    if (!L[y][x]) {
        flg = 0;
        p = check(x, y);
        // 置けることが確認できたとき
        if (p.p) {
            for (j = 9; j--;) {
                px = j % 3 - 1;
                py = (j / 3 | 0) - 1;
                if (p.mL[py + 1][px + 1]) {
                    flg = 1
                    L[y][x] = pl1;
                    while (L[ay = y + py * flg][ax = x + px * flg] == pl2) L[ay][ax] = pl1, flg++
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
                for (a = 64; a--;) p += check(a % 8, a / 8 | 0).p;
                if (!p) t("パス"), s();
                t(`${pl1}のターン`)
            }
            else {
                if (d[1] == d[2]) t("ドロー");
                else t(`${d.indexOf(Math.max(d[1], d[2]))}の勝ち`)
            }
        }
        else t("置けません")
    }
    else t("置けません");
    t(L.join("\n"))
}