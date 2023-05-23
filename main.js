L = [];
for (i = 8; i--;) L[i] = Array(8).fill(0);
L[3][4] = L[4][3] = 1;
L[3][3] = L[4][4] = 2;

t = t => console.log(t);

t(L);

F = 1;
S = 2;

s = z => {
    a = F;
    F = S;
    S = a
}

o = z => t("置けません");

c = (x, y) => {
    l = [[0, 0, 0], [0, 0, 0], [0, 0, 0], 0];
    if (!L[y][x]) {
        for (j = 9; j--;) {
            p = j % 3 - 1;
            q = (j / 3 | 0) - 1;
            ax = x + p;
            ay = y + q;
            while (L[ay] && L[ay][ax] == S) {
                ax += p;
                ay += q;
                if (L[ay] && L[ay][ax] == F) l[q + 1][p + 1] = l[3] = 1
            }
        }
    }
    return l
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
                    L[y][x] = F;
                    // y + (py - 1) * f  =>  y + py * f - f
                    while (L[ay = y + py * f - f][ax = x + px * f - f] == S) L[ay][ax] = F, f++
                }
            }
            d = [0, 0, 0];
            // 0,1,2を数える
            for (i of L) for (j of i) d[j]++;
            t(d);
            // 0,1,2のいずれも0でないとき
            if (d[0] * d[1] * d[2]) {
                s();
                p = 0;
                for (a = 64; a--;) p += c(a % 8, a / 8 | 0)[3];
                if (!p) t("パス"), s();
                t(F + "のターン")
            }
            else d[1] == d[2] ? t("ドロー") : t((d[1] > d[2] ? 1 : 2) + "の勝ち")
        }
        else o()
    }
    t(L.join("\n"))
}