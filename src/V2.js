/**
 * Class for representing 2 dimensional vectors, useful both for points and for vectors representing translation/movement/direction.
 */
class V2
{
    x = null;
    y = null;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    add(v2)
    {
        return new V2(this.x + v2.x, this.y + v2.y);
    }

    static sum(...vectors)
    {
        const result = new V2(0, 0);
        for(let i = 0; i < vectors.length; i++)
        {
            result.add(vectors[i]);
        }
        return result;
    }

    sub(v2)
    {
        return new V2(this.x - v2.x, this.y - v2.y);
    }

    static diff(a, b)
    {
        return a.sub(b);
    }

    mult(multiplier)
    {
        return new V2(this.x * multiplier, this.y * multiplier);
    }

    divide(divider)
    {
        if (divider == 0) {return new V2(NaN, NaN);}
        return new V2(this.x / divider, this.y / divider);
    }

    //shorthands
    static zero() {return new V2(0, 0);}
    static one() {return new V2(1, 1);}
    static u() {return new V2(0, 1);}
    static d() {return new V2(0, -1);}
    static l() {return new V2(-1, 0);}
    static r() {return new V2(1, 0);}

    clone()
    {
        return new V2(this.x, this.y);
    }

    static cloneFrom(other)
    {
        return new V2(other.x, other.y);
    }

    static sqDist(a, b)
    {
        return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    }

    static dist(a, b)
    {
        return Math.sqrt(V2.sqDist(a, b));
    }

    static mhDist(a, b)
    {
        const v = b.sub(a);
        return Math.abs(v.x) + Math.abs(v.y);
    }

    magnitude()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize()
    {
        const mag = this.magnitude();
        if (mag === 0){console.log("Tried normalizing vector with 0 magnitude."); return V2.zero;}
        return new V2(this.x / mag, this.y / mag);
    }

    static dot(a, b)
    {
        return a.x * b.x + a.y * b.y;
    }

    static normDot(a, b)
    {
        const nA = a.normalize();
        const nB = b.normalize();
        return V2.dot(nA, nB);
    }
  
    angleRaw()
    {
        return Math.atan2(this.y, this.x) * 180 / Math.PI;
    }

    angle()
    {
        const angle = this.angleRaw();
        return (angle >= -90 && angle <= 180) ? angle + 90 : angle + 450;
    }

    static angleBetween(a, b)
    {
        return Math.abs(Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x) * 180 / Math.PI);
    }

    round()
    {
        return new V2(Math.round(this.x), Math.round(this.y));
    }

    ceil()
    {
        return new V2(Math.ceil(this.x), Math.ceil(this.y));
    }

    floor()
    {
        return new V2(Math.floor(this.x), Math.floor(this.y));
    }

    swapDimensions()
    {
        return new V2(this.y, this.x);
    }

    setMagnitude(target)
    {
        if (target < 0) {console.error("Trying to set magnitude to a negative value, this is not possible."); return V2.zero();}
        const normalized = this.normalize();
        return normalized.mult(target);
    }

    clampMagnitude(min, max)
    {
        if (min < 0){min = 0;}
        const mag = this.magnitude();
        if (mag < min) {return this.setMagnitude(min);}
        if (mag > max) {return this.setMagnitude(max);}
        return this;
    }

    static getPointBetween(a, b, frac = 0.5)
    {
        const dir = b.sub(a);
        return a.add(dir.mult(frac));
    }

    toString()
    {
        return "[" + this.x.toString() + "; " + this.y.toString() + "]";
    }
}

export default V2