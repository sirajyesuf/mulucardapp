<?php

use App\Support\EthiopianPhone;

test('normalizes international 251 prefix', function () {
    expect(EthiopianPhone::normalize('251912345678'))->toBe('251912345678');
    expect(EthiopianPhone::normalize('+251 912 345 678'))->toBe('251912345678');
});

test('normalizes leading zero domestic mobile', function () {
    expect(EthiopianPhone::normalize('0912345678'))->toBe('251912345678');
    expect(EthiopianPhone::normalize('0712345678'))->toBe('251712345678');
});

test('normalizes nine-digit national without leading zero', function () {
    expect(EthiopianPhone::normalize('912345678'))->toBe('251912345678');
    expect(EthiopianPhone::normalize('712345678'))->toBe('251712345678');
});

test('rejects invalid numbers', function () {
    expect(EthiopianPhone::normalize(''))->toBeNull();
    expect(EthiopianPhone::normalize('123'))->toBeNull();
    expect(EthiopianPhone::normalize('0812345678'))->toBeNull();
    expect(EthiopianPhone::normalize('251812345678'))->toBeNull();
});
